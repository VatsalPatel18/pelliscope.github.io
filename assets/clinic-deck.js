(() => {
  "use strict";

  const reel = document.querySelector("[data-reel]");
  const scenes = [...document.querySelectorAll(".deck-scene")];
  const progressButtons = [...document.querySelectorAll(".deck-progress button")];
  const topbar = document.querySelector("[data-topbar]");
  const counter = document.querySelector(".deck-counter");
  const shareButton = document.querySelector("[data-share]");
  const toast = document.querySelector(".deck-toast");
  const nextButton = document.querySelector("[data-next]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;

  if (!reel || scenes.length === 0) return;

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  const goTo = (index) => {
    scenes[clamp(index, 0, scenes.length - 1)].scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "start",
    });
  };

  const setActive = (index) => {
    activeIndex = clamp(index, 0, scenes.length - 1);

    scenes.forEach((scene, sceneIndex) => {
      scene.classList.toggle("is-active", sceneIndex === activeIndex);
    });

    progressButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === activeIndex);
      button.classList.toggle("is-seen", buttonIndex < activeIndex);
      if (buttonIndex === activeIndex) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });

    const activeScene = scenes[activeIndex];
    const tone = activeScene.dataset.tone === "light" ? "light" : "dark";
    topbar?.classList.toggle("is-light", tone === "light");
    topbar?.classList.toggle("is-dark", tone === "dark");
    document.documentElement.dataset.activeScene = String(activeIndex);

    if (counter) {
      counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`;
    }

    const id = activeScene.id;
    if (id && window.location.hash !== `#${id}`) {
      history.replaceState(null, "", `#${id}`);
    }

    document.dispatchEvent(new CustomEvent("deck:scene", { detail: { index: activeIndex, id } }));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActive(scenes.indexOf(visible.target));
    },
    { root: reel, threshold: [0.42, 0.6, 0.78] },
  );

  scenes.forEach((scene) => observer.observe(scene));
  progressButtons.forEach((button, index) => button.addEventListener("click", () => goTo(index)));
  nextButton?.addEventListener("click", () => goTo(1));

  document.addEventListener("keydown", (event) => {
    const interactive = event.target instanceof HTMLElement
      && ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName);
    if (interactive) return;

    if (["ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
    if (["ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      goTo(scenes.length - 1);
    }
  });

  // Four-beat patient phone story. It runs only while its scene is visible.
  const phoneStory = document.querySelector("[data-phone-story]");
  const phoneFrames = [...document.querySelectorAll("[data-phone-frame]")];
  const phoneSteps = [...document.querySelectorAll("[data-phone-step]")];
  const phoneMeter = [...document.querySelectorAll(".phone-meter i")];
  const phoneToggle = document.querySelector("[data-phone-toggle]");
  let phoneIndex = 0;
  let phonePaused = reducedMotion.matches;
  let phoneTimer;

  const renderPhone = (index) => {
    phoneIndex = clamp(index, 0, phoneFrames.length - 1);

    phoneFrames.forEach((frame, frameIndex) => {
      frame.classList.toggle("is-active", frameIndex === phoneIndex);
      frame.classList.toggle("is-before", frameIndex < phoneIndex);
    });

    phoneSteps.forEach((step, stepIndex) => {
      step.classList.toggle("is-active", stepIndex === phoneIndex);
      if (stepIndex === phoneIndex) step.setAttribute("aria-current", "step");
      else step.removeAttribute("aria-current");
    });

    phoneMeter.forEach((mark, markIndex) => {
      mark.classList.toggle("is-active", markIndex === phoneIndex);
      mark.classList.toggle("is-seen", markIndex < phoneIndex);
    });
  };

  const stopPhone = () => window.clearInterval(phoneTimer);

  const schedulePhone = () => {
    stopPhone();
    if (phonePaused || activeIndex !== 1 || phoneFrames.length < 2) return;
    phoneTimer = window.setInterval(() => {
      if (phoneIndex === phoneFrames.length - 1) {
        stopPhone();
        return;
      }
      renderPhone(phoneIndex + 1);
    }, 2600);
  };

  phoneSteps.forEach((step, index) => {
    step.addEventListener("click", () => {
      renderPhone(index);
      schedulePhone();
    });
  });

  phoneToggle?.addEventListener("click", () => {
    phonePaused = !phonePaused;
    phoneToggle.classList.toggle("is-paused", phonePaused);
    phoneToggle.setAttribute("aria-label", phonePaused ? "Play patient journey animation" : "Pause patient journey animation");
    if (!phonePaused && phoneIndex === phoneFrames.length - 1) renderPhone(0);
    schedulePhone();
  });

  phoneStory?.addEventListener("mouseenter", stopPhone);
  phoneStory?.addEventListener("mouseleave", schedulePhone);
  phoneStory?.addEventListener("focusin", stopPhone);
  phoneStory?.addEventListener("focusout", schedulePhone);

  document.addEventListener("deck:scene", (event) => {
    if (event.detail.index === 1) {
      if (phoneIndex === phoneFrames.length - 1 && !phonePaused) renderPhone(0);
      schedulePhone();
    } else {
      stopPhone();
    }
  });

  if (phonePaused && phoneToggle) {
    phoneToggle.classList.add("is-paused");
    phoneToggle.setAttribute("aria-label", "Play patient journey animation");
  }

  renderPhone(0);

  shareButton?.addEventListener("click", async () => {
    const data = {
      title: "A skin concern can arrive ready | PelliScope",
      text: "See how PelliScope turns patient intake into a prepared case for dermatologist review.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(data.url);
        toast?.classList.add("is-visible");
        window.setTimeout(() => toast?.classList.remove("is-visible"), 1800);
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
      window.location.href = `mailto:?subject=${encodeURIComponent(data.title)}&body=${encodeURIComponent(data.url)}`;
    }
  });

  const hashTarget = window.location.hash ? document.querySelector(window.location.hash) : null;
  const linkedScene = hashTarget?.closest(".deck-scene");
  if (linkedScene) {
    const linkedIndex = scenes.indexOf(linkedScene);
    setActive(linkedIndex);
    requestAnimationFrame(() => goTo(linkedIndex));
  } else {
    setActive(0);
  }
})();

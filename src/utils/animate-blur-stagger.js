import { animate, inView, stagger } from "motion";

export function animateBlurStagger(element) {
  inView(element, ({ target }) => {
    const items = target.querySelectorAll(":scope > *");
    animate(
      items,
      {
        // @ts-ignore
        filter: ["blur(6px)", "blur(0px)"],
        opacity: [0, 1],
      },
      {
        duration: 1,
        easing: "ease-out",
        delay: stagger(0.2),
      }
    );
  });
}

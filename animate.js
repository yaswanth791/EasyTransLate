var t1 = gsap.timeline();

t1.from(".header", {
  opacity: 0,
  duration: 0.5,
  delay: 0.5,
});

t1.to(".logo--name", {
  transform: "translateY(0)",
  duration: 0.8,
});

t1.to(".arrow", {
  transform: "translateX(1500%)",
  duration: 0.8,
  repeat: -1,
  yoyo: true,
});

gsap.from(".color--style", {
  x: 2000,
  duration: 0.6,
  stagger: 0.1,
});

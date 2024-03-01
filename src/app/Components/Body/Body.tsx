import styles from "./Body.module.css";

const data = {
  content: [
    {
      p: "We are a community of open-source researchers committed to solving the hardest problems in decentralization, including the challenge of maintaining research and academic independence in the wake of technological vertical integration and hyper-financialization. Using plural mechanism design, we experiment with novel ways to surface ideas in the public interest that transcend our biases—protocol, politics, purse— while encouraging collaboration and insights across unlikely intersections where breakthroughs tend to emerge. ",
    },
    {
      p: "Our first convening  is May 22 & 23 in Berlin, where the community is tasked to allocate 100,000 ARB in research grants. The first topic broadly is MEV, though we accept other proposals related to decentralization, including privacy,  security, identity, censorship resistance, data dignity, and partial common ownership—to name just a few. Surprise us.",
    },
    {
      p: "Sign up with Zupass here. Early submissions before March 31 will be prioritized.",
    },
    {
      p: "The experiment will be novel, fun, and weird—like the best of research….and Berlin. Through a series of structured interactions, the community will decide how to prioritize research and allocate funds, relying on structured, high-bandwidth deliberations that surface research public goods, while elevating truth and expertise with peer prediction.  The community is interdisciplinary, drawing on insights from science of science, social science, economics, complexity science, cryptography, and philosophy, among other intersections. The community will test and evolve these mechanisms through multiple cycles of feedback and adaptation. ",
    },
  ],
};

export default function Body() {
  return (
    <div className={styles.body}>
      {data.content.map((p,index) => {
        return (<p className="lg:px-56 md:px-20 m-6" key={index}> {p.p}</p>);
      })}
    </div>
  );
}

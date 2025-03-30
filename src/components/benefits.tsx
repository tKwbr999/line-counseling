const benefits = [
  {
    icon: "📚",
    title: "豊富なカリキュラム",
    description:
      "初心者から上級者まで、幅広いスキルレベルに対応したプログラミング学習コンテンツを提供しています。実践的なプロジェクトを通じて、実務で役立つスキルを身につけることができます。",
    color: "border-blue-500",
  },
  {
    icon: "💚",
    title: "徹底したサポート",
    description:
      "経験豊富な講師陣が、あなたの学習を丁寧にサポート。つまずいたときも、すぐに質問できる環境を整えています。学習の進捗に合わせた個別カウンセリングも実施しています。",
    color: "border-purple-500",
  },
  {
    icon: "🤝",
    title: "充実したコミュニティ",
    description:
      "同じ目標を持つ仲間と繋がり、モチベーションを高め合えるコミュニティを提供。卒業後も継続的な交流の場があり、貴重な人脈を築くことができます。",
    color: "border-green-500",
  },
];

const Benefits = () => {
  return (
    <section className="py-32 bg-white" id="benefits">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16">
          <span className="relative inline-block">
            Blueberry Academy が選ばれる「3つの理由」
            <span className="absolute bottom-0 left-0 w-full h-2 bg-purple-500 opacity-30"></span>
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => (
            <div key={index} className={`border-l-4 ${benefit.color} pl-6`}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex items-center text-4xl justify-center w-20 h-20 bg-gray-100 rounded-full">
                  {benefit.icon}
                </span>
              </div>
              <div className="flex items-center justify- gap-3 mb-4">
                <div className="rounded-full p-2 bg-gray-">0{index + 1}</div>
                <h3 className="text-2xl font-bold">{benefit.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

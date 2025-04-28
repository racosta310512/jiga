import { useEffect } from 'react';
import gsap from 'gsap';
import backgroundImage from '../assets/3381454.jpg';
import TransfDigital from "../assets/trasnf_digital.jpg";

export default function Home() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fade-in', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const solutions = [
    { title: "Gestão de TI", description: "Soluções robustas em infraestrutura, AMS, Service Desk & Field Services, SAP e Outsourcing de TI." },
    { title: "Big Data & Analytics", description: "Soluções completas em BI, Data Analytics, Machine learning e Big Data para insights estratégicos." },
    { title: "Chatbot & IA", description: "Solução completa para atendimento inteligente, melhorando a experiência do cliente." }
  ];

  const cases = [
    { title: "Case NIVEA", description: "A NIVEA acelerou sua jornada digital com apoio da TOPMIND, implementando soluções inovadoras." },
    { title: "Case Mosaic Fertilizantes", description: "Automatização da gestão de escritórios com apoio da TOPMIND, otimizando processos internos." },
    { title: "Case Via", description: "Parceria para a implementação de tecnologia em lojas da Via, melhorando a eficiência operacional." }
  ];

  const ctaItems = [
    { title: "Soluções sob medida", description: "Tecnologia adaptada ao seu negócio, com escalabilidade garantida." },
    { title: "Equipe especializada", description: "Profissionais com expertise em inovação, IA, cloud e big data." },
    { title: "Resultados mensuráveis", description: "Automação e inteligência que geram produtividade real." }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="fade-in bg-gradient-to-r from-blue-900 to-green-500 text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">INOVAÇÃO TECNOLÓGICA</h1>
            <p className="text-white/80 mb-6">
              Na Jiga Soluções, a inovação tecnológica é o alicerce que sustenta nossas ações. Nosso compromisso é transformar ideias em soluções digitais inteligentes, proporcionando experiências tecnológicas que impulsionam o sucesso empresarial.
            </p>
            <p className="text-white/80 mb-6">
              Combinando criatividade e expertise técnica, desenvolvemos ferramentas digitais que otimizam processos e elevam a competitividade no mercado.
            </p>
            <button className="bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-cyan-300 transition">
              SAIBA MAIS
            </button>
          </div>
          <div className="flex justify-center">
            <div
              className="w-[260px] h-[500px] bg-cover bg-center rounded-[2rem] shadow-2xl relative overflow-hidden border-4 border-cyan-400"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-cyan-400"></div>
              <div className="absolute top-4 right-4 w-16 h-3 bg-cyan-400 rounded-full"></div>
              <div className="absolute inset-0 p-4 flex flex-col gap-4">
                <div className="w-full h-10 bg-white/20 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soluções Section */}
      <section className="fade-in py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Soluções Tecnológicas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-4">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="fade-in py-20 px-6 md:px-12 bg-gradient-to-r from-green-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Lado esquerdo */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transforme sua empresa com tecnologia
            </h2>
            <p className="mb-6 text-white/90">
              Com mais de 21 anos de experiência, a TOPMIND é referência em soluções inovadoras. Nossa missão é impulsionar a transformação digital das empresas, otimizando processos e gerando resultados estratégicos.
            </p>

            <div className="space-y-4">
              {ctaItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-cyan-400 text-black rounded-full p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-cyan-300 transition">
              Conheça nossa história
            </button>
          </div>

          {/* Lado direito */}
          <div className="flex justify-center">
            <img
              src={TransfDigital}
              alt="Transformação Digital"
              className="w-full max-w-md rounded-2xl shadow-xl border-4 border-cyan-400"
            />
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="fade-in py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Conheça nossos Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((caseItem, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-4">{caseItem.title}</h3>
                <p className="text-gray-600">{caseItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

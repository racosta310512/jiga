/*export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-12 py-20 gap-10 items-center">
      <div>
        <h1 className="text-5xl font-bold mb-6">INOVAÇÃO TECNOLÓGICA</h1>
        <p className="text-white/80 mb-6">
          Na jiga Soluções, estamos moldando o futuro com soluções digitais inteligentes. Nossa missão é transformar ideias em experiências tecnológicas reais que impulsionam empresas para o sucesso.
        </p>
        <button className="bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-cyan-300 transition">SAIBA MAIS</button>
      </div>
      <div className="flex justify-center">
        <div className="w-[260px] h-[500px] bg-gradient-to-tr from-[#330066] to-[#9900cc] rounded-[2rem] shadow-2xl relative overflow-hidden border-4 border-cyan-400">
          <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-cyan-400"></div>
          <div className="absolute top-4 right-4 w-16 h-3 bg-cyan-400 rounded-full"></div>
          <div className="absolute inset-0 p-4 flex flex-col gap-4">
            <div className="w-full h-10 bg-white/20 rounded-xl"></div>
            <div className="w-3/4 h-10 bg-white/20 rounded-xl"></div>
            <div className="w-4/5 h-10 bg-white/20 rounded-xl"></div>
            <div className="w-2/3 h-10 bg-white/20 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}*/

import backgroundImage from '../assets/3381454.jpg';

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-green-500 text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">INOVAÇÃO TECNOLÓGICA</h1>
            <p className="text-white/80 mb-6">
              Na Jiga Soluções, a inovação tecnológica é o alicerce que sustenta nossas ações. Nosso compromisso é transformar ideias em soluções digitais inteligentes, proporcionando experiências tecnológicas que impulsionam o sucesso empresarial. Acreditamos que a tecnologia deve ser uma aliada estratégica, capaz de abrir novos caminhos e oportunidades para as empresas.​
            </p>
            <p className="text-white/80 mb-6">
            Combinando criatividade e expertise técnica, desenvolvemos ferramentas digitais que otimizam processos e elevam a competitividade no mercado. Desde aplicações web até sistemas integrados, nossas soluções são projetadas para serem escaláveis e adaptáveis às constantes mudanças do ambiente empresarial.​
            </p>
            <button className="bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-cyan-300 transition">SAIBA MAIS</button>
          </div>
          <div className="flex justify-center" >
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
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Soluções Tecnológicas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Solução 1 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Gestão de TI</h3>
              <p className="text-gray-600">Soluções robustas em infraestrutura, AMS, Service Desk & Field Services, SAP e Outsourcing de TI.</p>
            </div>
            {/* Solução 2 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Big Data & Analytics</h3>
              <p className="text-gray-600">Soluções completas em BI, Data Analytics, Machine learning e Big Data para insights estratégicos.</p>
            </div>
            {/* Solução 3 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Chatbot & IA</h3>
              <p className="text-gray-600">Solução completa para atendimento inteligente, melhorando a experiência do cliente.</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-green-700 to-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforme sua empresa com tecnologia</h2>
          <p className="mb-8">Com mais de 21 anos de experiência, a TOPMIND é referência em soluções inovadoras de tecnologia. Nossa missão é impulsionar a transformação digital das empresas, otimizando processos e gerando resultados estratégicos.</p>
          <button className="bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-cyan-300 transition">Conheça nossa história</button>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Conheça nossos Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Case 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Case NIVEA</h3>
              <p className="text-gray-600">A NIVEA acelerou sua jornada digital com apoio da TOPMIND, implementando soluções inovadoras.</p>
            </div>
            {/* Case 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Case Mosaic Fertilizantes</h3>
              <p className="text-gray-600">Automatização da gestão de escritórios com apoio da TOPMIND, otimizando processos internos.</p>
            </div>
            {/* Case 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">Case Via</h3>
              <p className="text-gray-600">Parceria para a implementação de tecnologia em lojas da Via, melhorando a eficiência operacional.</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}

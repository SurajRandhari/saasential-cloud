import RequestDemo from '@/components/ui/RequestDemo';

export default function RequestDemoMain() {
  return (
    <section className="py-[150px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-normal capitalize leading-tight md:leading-[52px]  mb-4">Ready to see it in action?</h2>
          <p className="text-gray-600 mb-8">Get a personalized demo tailored to your needs</p>
        </div>
        <RequestDemo />
      </div>
    </section>
  );
}

import chat1 from "@/assets/chat1.jpg";
import chat2 from "@/assets/chat2.jpeg";
import chat3 from "@/assets/chat3.png";
import heroMascotVid from "@/assets/hero_mascot_vid.mp4";
import MessageBubble from "@/components/MessageBubble";
import ContactUs from "@/components/ContactUs";

const HeroSection = () => {
  const chatImages = [chat1, chat2, chat3, chat1, chat2, chat3];

  return (
    <section className="relative overflow-hidden py-20">
      <div className="px-4 text-center relative z-10">
        <div className="flex justify-center mb-8">
          <video
            src={heroMascotVid}
            autoPlay
            muted
            loop
            playsInline
            className="w-40 h-40 rounded-full object-cover animate-pop-in shadow-[0_0_50px_rgba(0,229,255,0.6)]"
          />
        </div>
        <MessageBubble className="mb-6">
          <h1 className="text-md md:text-4xl font-bold leading-tight text-primary cyber-glow">
            כל שיחה שלא נענית = לקוח שהלך. פורלי מחזיר אותו אליך
          </h1>
        </MessageBubble>
        <MessageBubble className="max-w-[100%] w-full md:w-4/5">
          <p className="text-md md:text-xl leading-relaxed text-foreground">
            פורלי עונה בשמך, שולח ווטסאפ ללקוח, מתעד את השיחה – ואתה לא מפספס הזדמנות
          </p>
        </MessageBubble>

        <div className="carousel">
          <div className="flex justify-center carousel-group">
            {chatImages.map((image, index) => (
              <div key={index} className="chat-card">
                <img src={image} alt="דוגמת שיחה מהבוט" />
              </div>
            ))}
          </div>
          <div className="flex justify-center carousel-group">
            {chatImages.map((image, index) => (
              <div key={index} className="chat-card">
                <img src={image} alt="דוגמת שיחה מהבוט" />
              </div>
            ))}
          </div>
        </div>
        <ContactUs showWhatsAppOption={true} />
      </div>
    </section>
  );
};

export default HeroSection;

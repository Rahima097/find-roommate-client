import faqimg from './../assets/bg-r-faq.png'
import { Typewriter } from 'react-simple-typewriter';
import { Fade, Zoom } from 'react-awesome-reveal';


const Faq = () => {
  return (
    <Fade cascade damping={0.2} triggerOnce>
      <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Zoom effect on FAQ image */}
        <Zoom triggerOnce>
          <div className="flex-1">
            <img
              src={faqimg}
              alt="Roommate Discussion"
              className="w-full rounded-2xl"
            />
          </div>
        </Zoom>

        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-secondary">
            <Typewriter
              words={['Frequently Asked Questions']}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>

          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border border-base-300 my-2 ">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-lg font-medium text-secondary">
                How do I find a suitable roommate?
              </div>
              <div className="collapse-content">
                <p>Use our smart listings and search (location, lifestyle, budget) and read verified profiles. You can message potential roommates directly on our platform.</p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border border-base-300 my-2 ">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium text-secondary">
                Is it free to post a roommate listing?
              </div>
              <div className="collapse-content">
                <p>Yes! You can post your listing for free. Premium options are available for more visibility.</p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border border-base-300 my-2 ">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium text-secondary">
                Are the users verified?
              </div>
              <div className="collapse-content">
                <p>Yes, all users go through email verification and have the option to add more ID details for added trust.</p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border border-base-300 my-2 ">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium text-secondary">
                Can I update or delete my listing?
              </div>
              <div className="collapse-content">
                <p>Absolutely. You can edit or remove your listing anytime from your dashboard.</p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border border-base-300 my-2 ">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium text-secondary">
                How do I stay safe when meeting roommates?
              </div>
              <div className="collapse-content">
                <p>Meet in public places first, share minimal personal info, and use our in-platform messaging until you feel comfortable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default Faq;

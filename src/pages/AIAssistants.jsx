import { Link } from 'react-router-dom';
import { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';  

function AIAssistants() {
    const [heroRef, heroVisible] = useScrollAnimation();
    const [advancedRef, advancedVisible] = useScrollAnimation();
    const [stepsRef, stepsVisible] = useScrollAnimation();
    const [aiPoweredRef, aiPoweredVisible] = useScrollAnimation();
    const [howToRef, howToVisible] = useScrollAnimation();

    const fadeUp = (visible, delay = 0) =>
        `transition-all duration-700 ease-out ${
            visible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
        } ${delay ? `delay-[${delay}ms]` : ''}`;

    return (
        <div className="w-full min-h-screen bg-white font-sans">
            <section className="w-full">
                <div className="max-w-[1200px] mx-auto px-5">
                    <img src="/images/skin-logo.avif" alt="SkinInsights" className="block mx-auto py-5 max-w-[200px] h-auto" />
                    
                    <div 
                        ref={heroRef}
                        className={`flex flex-col items-center justify-center gap-8 pt-10 pb-20 md:flex-row md:gap-16 ${fadeUp(heroVisible)}`}
                    >
                        <div className="flex-1 min-w-[300px] flex justify-center">
                            <img src="/images/imgAI.avif" alt="AI Skin Analysis" className="max-w-[450px] w-full h-auto object-contain" />
                        </div>
                        <div className="flex-1 min-w-[300px] max-w-[500px] text-center">
                            <h1 className="text-[2rem] md:text-[2.8rem] font-normal text-gray-900 leading-snug mb-5">
                                Understand your skin better with AI
                            </h1>
                            <p className="text-[1.1rem] text-gray-800 leading-relaxed mb-8">
                                Take a skin analysis to get your personalized skin care routine
                            </p>                        
                        </div>
                    </div>
                </div>
            </section>

            <section ref={advancedRef} className="w-full py-20 bg-white">
                <div className="max-w-[1100px] mx-auto px-5">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 items-start">
                        <div className={`border border-gray-200 py-10 px-8 md:py-[60px] md:px-10 text-center flex flex-col items-center justify-center md:min-h-[620px] ${fadeUp(advancedVisible)}`}>
                            <h2 className="text-[2.4rem] font-semibold text-gray-900 leading-snug mb-4">
                                Advanced &<br/>Accurate Skin<br/>Analysis
                            </h2>
                            <h3 className="text-[1.6rem] font-medium text-gray-900 mb-6">3-step analysis</h3>
                            <p className="text-base text-gray-500 leading-relaxed mb-9 max-w-[320px]">
                                Unlock your skin's true potential with our diagnostic process: Assess, Capture & Get Routine.
                            </p>
                        </div>
                        <div className={`flex flex-col ${fadeUp(advancedVisible, 150)}`}>
                            <img src="/images/image1.avif" alt="Skin Assessment" className="w-full h-auto object-cover block" />
                            <div className="bg-gray-100 px-8 py-6">
                                <div className="text-sm text-gray-400 uppercase tracking-widest mb-2">STEP 1</div>
                                <h4 className="text-[1.4rem] font-semibold text-gray-900 mb-2.5">Take a short Assessment</h4>
                                <p className="text-[0.95rem] text-gray-500 leading-relaxed">To understand your skin type, age, concerns and goals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={stepsRef} className="w-full pb-20 bg-white">
                <div className="max-w-[1100px] mx-auto px-5">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
                        <div className={`flex flex-col ${fadeUp(stepsVisible)}`}>
                            <img src="/images/image2.avif" alt="Upload Selfie" className="w-full h-[350px] object-cover block" />
                            <div className="bg-gray-100 px-8 py-6 flex-grow">
                                <div className="text-sm text-gray-400 uppercase tracking-widest mb-2">STEP 2</div>
                                <h4 className="text-[1.4rem] font-semibold text-gray-900 mb-2.5">Upload a Selfie</h4>
                                <p className="text-[0.95rem] text-gray-500 leading-relaxed">To let our AI analyze your skin in detail for more accurate results.</p>
                            </div>
                        </div>
                        <div className={`flex flex-col ${fadeUp(stepsVisible, 200)}`}>
                            <img src="/images/image3.avif" alt="Get Routine" className="w-full h-[350px] object-cover block" />
                            <div className="bg-gray-100 px-8 py-6 flex-grow">
                                <div className="text-sm text-gray-400 uppercase tracking-widest mb-2">STEP 3</div>
                                <h4 className="text-[1.4rem] font-semibold text-gray-900 mb-2.5">Get your Routine</h4>
                                <p className="text-[0.95rem] text-gray-500 leading-relaxed">Get your personalized skincare routine tailored to your unique needs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={aiPoweredRef} className="w-full py-16 bg-gray-200">
                <div className="max-w-[1100px] mx-auto px-5">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-16">
                        <div className={`flex-1 min-w-[300px] ${fadeUp(aiPoweredVisible)}`}>
                            <h1 className="text-[2.2rem] md:text-[3.2rem] font-bold text-gray-900 mb-1 leading-none">AI Powered</h1>
                            <h2 className="text-[1.6rem] md:text-[2.2rem] font-semibold text-gray-900 mb-8 leading-tight">Skin Analysis</h2>
                            <ul className="list-disc pl-6 mb-8">
                                <li className="text-lg text-gray-900 leading-loose mb-2">15 years of skin research.</li>
                                <li className="text-lg text-gray-900 leading-loose mb-2">Matches dermatologist accuracy 95% of the time.</li>
                                <li className="text-lg text-gray-900 leading-loose mb-2">A skin strength database with 10,000 graded pictures.</li>
                                <li className="text-lg text-gray-900 leading-loose mb-2">Powered by Artificial Intelligence.</li>
                            </ul>
                        </div>
                        <div className={`flex-1 min-w-[300px] flex justify-center ${fadeUp(aiPoweredVisible, 200)}`}>
                            <img src="/images/Group1.avif" alt="Skin Analysis" className="max-w-full h-auto object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            <section ref={howToRef} className="w-full py-20 bg-white">
                <div className="max-w-[1200px] mx-auto px-5">
                    <h2 className={`text-3xl font-normal text-gray-900 text-center mb-12 ${fadeUp(howToVisible)}`}>
                        How to take your picture for skin analysis?
                    </h2>
                    <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:flex-wrap md:items-start">
                        <div className={`flex-1 min-w-[280px] max-w-full md:max-w-[320px] text-center ${fadeUp(howToVisible)}`}>
                            <img src="/images/Step_01.avif" alt="Step 1" className="w-full max-w-[200px] h-auto mb-5 object-contain mx-auto" />
                            <h5 className="text-lg font-medium text-gray-900 mb-2.5">Take a natural picture</h5>
                            <p className="text-sm text-gray-500 leading-relaxed px-2.5">Remove make-up. Take-off your glasses. Pull your hair back & tie it.</p>
                        </div>
                        <div className={`flex-1 min-w-[280px] max-w-full md:max-w-[320px] text-center ${fadeUp(howToVisible, 150)}`}>
                            <img src="/images/Step_02.avif" alt="Step 2" className="w-full max-w-[200px] h-auto mb-5 object-contain mx-auto" />
                            <h5 className="text-lg font-medium text-gray-900 mb-2.5">Ensure it's a well-lit face</h5>
                            <p className="text-sm text-gray-500 leading-relaxed px-2.5">Enhance the accuracy of results by clicking the picture in natural light or well-lit space</p>
                        </div>
                        <div className={`flex-1 min-w-[280px] max-w-full md:max-w-[320px] text-center ${fadeUp(howToVisible, 300)}`}>
                            <img src="/images/Step_03.avif" alt="Step 3" className="w-full max-w-[200px] h-auto mb-5 object-contain mx-auto" />
                            <h5 className="text-lg font-medium text-gray-900 mb-2.5">Align your face</h5>
                            <p className="text-sm text-gray-500 leading-relaxed px-2.5">Place your face inside the outline</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AIAssistants;
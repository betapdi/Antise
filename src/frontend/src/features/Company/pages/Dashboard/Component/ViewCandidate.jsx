import React from 'react';
import { useLocation } from 'react-router-dom';

function ViewCandidate() {
    const location = useLocation();
    const { application } = location.state || {}; // Destructure the passed application
    console.log('application', application);
    console.log("Received state in ViewCandidate:", location.state);


    // if (!application) {
    //     return <div>No application data available.</div>;
    // }

    return (
        <div className="w-full relative bg-white rounded-xl">
            <div className="w-full justify-between items-center inline-flex mb-8">
                <div className="justify-center items-center gap-6 flex">
                    <img
                        src={`/image/avatar.png`}
                        alt="avatar"
                        className="w-20 h-20 rounded-full border"
                    />
                    <div className="flex-col justify-start items-start gap-2 inline-flex">
                        <div className="text-[#18191c] text-2xl font-medium font-['Inter'] leading-loose">Esther Howard</div>
                        <div className="text-[#767f8c] text-base font-normal font-['Inter'] leading-normal">Website Designer (UI/UX)</div>
                    </div>
                </div>
                <div className="h-12 justify-start items-start gap-3 inline-flex">
                    <div className="p-3 bg-[#e7f0fa] rounded-[5px] justify-start items-start gap-2.5 flex">
                        <div className="w-6 h-6 justify-center items-center flex">
                            <img
                                src={`/image/Star.png`}
                                alt="star"
                            />
                        </div>
                    </div>
                    <div className="px-6 py-3 rounded-[3px] border-2 border-[#0a65cc] justify-center items-center gap-3 flex">
                        <div className="w-6 h-6 justify-center items-center flex">
                            <img
                                src={`/image/Envelope.png`}
                                alt="Envelope"
                            />
                        </div>
                        <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">Send Mail</div>
                    </div>
                    <div className="px-6 py-3 rounded-[3px]  bg-[#0a65cc] border-2 border-[#0a65cc] justify-center items-center gap-3 flex">
                        <img
                            src={`/image/fi_arrow-right-circle.png`}
                            alt="Envelope"
                        />
                        <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">Hire Candidates</div>
                    </div>
                </div>
            </div>
            <div className="justify-start items-start gap-[72px] inline-flex">
                <div className="flex-col justify-start items-start gap-8 inline-flex">
                    <div className="flex-col justify-start items-start gap-6 flex">
                        <div className="text-[#18191c] text-lg font-medium font-['Inter'] leading-[18px]">BIOGRAPHY</div>
                        <div className="flex-col justify-start items-start gap-3 flex">
                            <div className=" text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">I've been passionate about graphic design and digital art from an early age with a keen interest in Website and Mobile Application User Interfaces. I can create high-quality and aesthetically pleasing designs in a quick turnaround time. Check out the portfolio section of my profile to see samples of my work and feel free to discuss your designing needs. I mostly use Adobe Photoshop, Illustrator, XD and Figma. *Website User Experience and Interface (UI/UX) Design - for all kinds of Professional and Personal websites. *Mobile Application User Experience and Interface Design - for all kinds of IOS/Android and Hybrid Mobile Applications. *Wireframe Designs.</div>
                        </div>
                    </div>
                    <div className="w-full h-[0px] border border-[#e4e5e8]"></div>
                    <div className="flex-col justify-start items-start gap-6 flex">
                        <div className=" text-[#18191c] text-lg font-medium font-['Inter'] leading-[18px]">COVER LETTER</div>
                        <div className="flex-col justify-start items-start gap-3 flex">
                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Dear Sir,</div>
                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">I am writing to express my interest in the fourth grade instructional position that is currently available in the Fort Wayne Community School System. I learned of the opening through a notice
                                <br />posted on JobZone, IPFW’s job database. I am confident that my academic background and curriculum development skills would be successfully utilized in this teaching position. </div>
                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">I have just completed my Bachelor of Science degree in Elementary Education and have successfully completed Praxis I and Praxis II. During my student teaching experience, I developed and initiated a three-week curriculum sequence on animal species and earth resources. This collaborative unit involved working with three other third grade teachers within my team, and culminated in a field trip to the Indianapolis Zoo Animal Research Unit.</div>
                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Sincerely,</div>
                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Esther Howard</div>
                        </div>
                    </div>
                </div>
                <div className="mr-4 flex-col justify-start items-start gap-6 inline-flex">
                    <div className="w-full p-6 bg-white rounded-lg border border-[#e7f0fa] flex-col justify-start items-start gap-6 inline-flex">
                        <div className="w-full justify-start gap-20 items-start inline-flex">
                            <div className="justify-start items-start gap-4 flex">
                                <div className="flex-col justify-start items-start gap-3 inline-flex">
                                    <div className="w-6 h-6 justify-center items-center inline-flex">
                                        <img
                                            src={`/image/UserCircle.png`}
                                            alt="star"
                                        />
                                    </div>
                                    <div className="rem flex-col justify-start items-start gap-1 flex">
                                        <div className="self-stretch text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Gender</div>
                                        <div className="self-stretch text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">Male</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-col justify-start items-start gap-3 inline-flex">
                                <div className="w-6 h-6 justify-center items-center inline-flex">
                                    <img
                                        src={`/image/MapTrifold.png`}
                                        alt="star"
                                    />
                                </div>
                                <div className="flex-col justify-start items-start gap-1 flex">
                                    <div className="self-stretch text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Nationality</div>
                                    <div className="self-stretch text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">Bangladesh</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full justify-start items-start gap-14 inline-flex">
                            <div className="flex-col justify-start items-start gap-3 inline-flex">
                                <div className="w-6 h-6 justify-center items-center inline-flex">
                                    <img
                                        src={`/image/BlueStack.png`}
                                        alt="star"
                                    />
                                </div>
                                <div className="flex-col justify-start items-start gap-1 flex">
                                    <div className="self-stretch text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Experience</div>
                                    <div className="self-stretch text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">7 Years</div>
                                </div>
                            </div>
                            <div className="flex-col justify-start items-start gap-3 inline-flex">
                                <div className="w-6 h-6 justify-center items-center inline-flex">
                                    <img
                                        src={`/image/GraduationCap.png`}
                                        alt="star"
                                    />
                                </div>
                                <div className="flex-col justify-start items-start gap-1 flex">
                                    <div className="self-stretch text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Educations</div>
                                    <div className="self-stretch text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">Master Degree</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-white rounded-lg border border-[#cee0f5]/70 flex-col justify-start items-start gap-4 flex">
                        <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">Download My Resume</div>
                        <div className="rounded-lg justify-between items-center inline-flex gap-10">
                            <div className="justify-start items-center gap-3 flex">
                                <img
                                    src={`/image/fi_file-text.png`}
                                    alt="star"
                                />
                                <div className="flex-col justify-start items-start gap-1 inline-flex">
                                    <div className="text-[#767f8c] text-xs font-normal font-['Inter'] leading-[18px]">Esther Howard</div>
                                    <div className="text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">PDF</div>
                                </div>
                            </div>
                            <div className="p-3 bg-[#e7f0fa] rounded-[5px] justify-start items-start gap-2.5 flex">
                                <div className="w-6 h-6 justify-center items-center flex">
                                    <img
                                        src={`/image/DownloadSimple.png`}
                                        alt="star"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-white rounded-lg border border-[#cee0f5]/70 flex-col justify-start items-start gap-6 flex">
                        <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">Contact Information</div>
                        <div className="flex-col justify-start items-start gap-5 flex">
                            <div className="flex-col justify-start items-start gap-3 flex">
                                <div className="justify-start items-start gap-4 inline-flex">
                                    <img
                                        src={`/image/map-pin-line-duotone (1) 1.png`}
                                        alt="star"
                                    />
                                    <div className="flex-col justify-start items-start gap-1 inline-flex">
                                        <div className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Location</div>
                                        <div className="text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">Beverly Hills, California 90202</div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[0px] border border-[#e4e5e8]"></div>
                            <div className="justify-start items-start gap-4 inline-flex">
                                <img
                                    src={`/image/phone-call-duotone 1.png`}
                                    alt="star"
                                />
                                <div className="flex-col justify-start items-start gap-3 inline-flex">
                                    <div className="flex-col justify-start items-start gap-1 flex">
                                        <div className="w-[216px] text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Phone</div>
                                        <div className="w-[216px] text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">+1-202-555-0141</div>
                                    </div>
                                    <div />
                                </div>
                            </div>
                            <div className="h-[0px] border border-[#e4e5e8]"></div>
                            <div className="justify-start items-start gap-4 inline-flex">
                                <img
                                    src={`/image/Envelope.png`}
                                    alt="star"
                                />
                                <div className="flex-col justify-start items-start gap-1 inline-flex">
                                    <div className="w-[216px] text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Email address</div>
                                    <div className="w-[216px] text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">esther.howard@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCandidate;

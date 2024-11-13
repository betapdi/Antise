@startuml
left to right direction

actor "Job Seeker" as JobSeeker
actor "HR Professional" as HR
actor "Platform Administrator" as Admin

actor "Server Authentication" as ServerAuth
actor "Third-Party Authentication" as ThirdPartyAuth
actor "Payment Gateway Service" as PaymentService

rectangle Antise {
    JobSeeker -- (Sign In/Register)
    JobSeeker -- (Create/Edit Profile)
    JobSeeker -- (Upload Resume)
    JobSeeker -- (Search for Jobs)
    JobSeeker -- (Apply for Jobs)
    JobSeeker -- (Receive Notifications)
    JobSeeker -- (Create/Participate in Job Forum)
    JobSeeker -- (Upgrade to Premium)
    JobSeeker -- (Bookmark Jobs)
    JobSeeker -- (Get Interview Feedback)
    
    HR -- (Sign In/Register)
    HR -- (Create/Edit Profile)
    HR -- (Upload Job Description)
    HR -- (Review Applications and Resumes)
    HR -- (Provide Feedback and Guidance)
    HR -- (Create Entrance Test)
    HR -- (Manage Company Page)
    HR -- (CV Filtering)
    HR -- (Create/Participate in Job Forum)
    HR -- (Schedule Interviews)
    (CV Filtering) .> (Automatic CV Filtering) : <<extend>>
    (CV Filtering) .> (Manual Filtering) : <<extend>>
    HR -- (Upgrade to Premium)
    (Upgrade to Premium) .> (Payment Process) : <<include>>
    
    Admin -- (Manage Platform Operations)
    Admin -- (Monitor User Activity and Engagement)
    Admin -- (Verify Company Authenticity)
    Admin -- (Conduct Profile)
    Admin -- (Documentation Checks)
    Admin -- (Manage Payment Gateways)
    Admin -- (Manage Advertisement Banners)
    Admin -- (Generate Reports and Analytics)
}

skinparam actorPlacement left

(Sign In/Register) --- ServerAuth
(Sign In/Register) --- ThirdPartyAuth
(Payment Process) --- PaymentService
(Upgrade to Premium) --- PaymentService

@enduml

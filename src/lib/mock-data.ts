import { CompanyAnalysisInput } from "./types";

export const MOCK_COMPANIES: Record<string, CompanyAnalysisInput> = {
  uber: {
    companyName: "Uber",
    industry: "Transportation / On-demand",
    businessModel: "Two-sided marketplace connecting riders and drivers.",
    coreTechnology: "Real-time matching algorithm, dynamic pricing, global routing system.",
    complementors: "Vehicle manufacturers, charging networks, maps (Google Maps), payment processors.",
    competitors: "Lyft, DoorDash (logistics), local taxi services, public transit.",
    monetizationModel: "Take-rate from every trip transaction (Commission).",
    networkEffects: "Strong indirect network effects: more drivers attract more riders (lower wait times), more riders attract more drivers (higher earnings).",
    switchingCosts: "Low for both riders and drivers; apps are easy to switch.",
    multihomingRisk: "High: drivers and riders frequently use multiple apps simultaneously.",
    disintermediationRisk: "Moderate: riders and drivers could potentially try to bypass the platform for recurring trips (cash payments), but Uber provides safety and insurance."
  },
  linkedin: {
    companyName: "LinkedIn",
    industry: "Professional Networking / HR Tech",
    businessModel: "Freemium professional social network and talent solutions marketplace.",
    coreTechnology: "Professional identity graph, search and matching algorithms for recruiters.",
    complementors: "Educational institutions (credentials), content creators, enterprise software providers.",
    competitors: "Indeed, Monster, Glassdoor, X (Twitter), Slack (internal networking).",
    monetizationModel: "Premium subscriptions, recruiter tools, advertising, and marketing solutions.",
    networkEffects: "Very strong direct network effects (professional graph) and indirect effects (talent and companies).",
    switchingCosts: "High: years of professional history, endorsements, and network are locked in.",
    multihomingRisk: "Low: professionals typically maintain only one primary professional profile.",
    disintermediationRisk: "Low: the value is in the discovery and broad network access, not just individual relationships."
  },
  kakao: {
    companyName: "Kakao",
    industry: "Super App / Messaging / Digital Services",
    businessModel: "Mobile-first ecosystem centered around KakaoTalk messaging app.",
    coreTechnology: "Messaging infrastructure, KakaoBank fintech platform, AI recommendation engine.",
    complementors: "Game developers, taxi drivers, local merchants, content publishers.",
    competitors: "Naver, Coupang, Line, global platforms (Google, Meta).",
    monetizationModel: "Advertising, commerce, gaming, fintech fees, mobility services.",
    networkEffects: "Extremely strong direct network effects in messaging; massive indirect effects as a super-app gateway.",
    switchingCosts: "Very High: deep integration into daily life in South Korea (payments, taxis, IDs).",
    multihomingRisk: "Low for messaging, but moderate for individual vertical services like shopping or music.",
    disintermediationRisk: "Low: integration across services makes bypassing difficult."
  }
};

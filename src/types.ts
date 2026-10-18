export type QuadrantId =
  | 'together_right_answer'     // Top-Left: A person leads, AI inside (Tasks 1, 2, 3)
  | 'together_no_right_answer'  // Top-Right: AI agents run the work, a person judges inside
  | 'alone_right_answer'        // Bottom-Left: AI alone (Task 4)
  | 'alone_no_right_answer';     // Bottom-Right: A person + AI (Alongside)

export interface TaskItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  quadrantId: QuadrantId;
  category: 'email' | 'notifications' | 'news' | 'property' | 'strategy' | 'creative' | 'custom';
  tags: string[];
  archetype: string; // e.g. "A person leads, AI inside"
  whyAnswer: string; // Why it has/doesn't have a right answer
  whyInterdependence: string; // Why together vs alone
  humanRole: string;
  aiRole: string;
  workspaceKey: 'gmail_priority' | 'urgent_notifications' | 'news_summary' | 'property_translation' | 'general';
}

export interface EmailItem {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  fullBody: string;
  receivedAt: string;
  deadlineHoursRemaining?: number; // e.g. 36 hours for 2-day items
  priority: 'high_2days' | 'medium' | 'not_important';
  actionRequired: string;
  aiSuggestedReply: string;
  status: 'pending' | 'actioned' | 'dismissed';
}

export interface NotificationItem {
  id: string;
  source: 'gmail' | 'whatsapp' | 'linkedin' | 'university';
  senderName: string;
  senderTitleOrOrg: string;
  isVip: boolean;
  messageSnippet: string;
  timestamp: string;
  actionRequired: string;
  status: 'pending' | 'resolved';
  channelColor: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  publishedTime: string;
  fullText: string;
  keyTopics: string[];
  keyFacts: string[];
  impactAssessment: {
    affectedParties: string;
    strategicImpact: string;
    recommendedAction: string;
  };
  humanJudgmentNote: string;
}

export interface PropertyListing {
  id: string;
  code: string;
  propertyName: string;
  location: string;
  price: string;
  specs: {
    areaSqFt: number;
    bedrooms: number;
    bathrooms: number;
    zoning: string;
    yearBuilt: number;
  };
  descriptionEn: string;
  translations: Record<string, string>; // langCode -> translated description
  status: 'ready' | 'translated' | 'dispatched';
  dispatchedTo?: string;
  dispatchedAt?: string;
}

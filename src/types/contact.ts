export interface ContactData {
  // Name fields
  firstName: string;
  lastName: string;

  // Contact information
  emails: string[];
  phones: string[];

  // Professional information
  organization?: string;
  jobTitle?: string;

  // Additional contact methods
  websites?: string[];

  // Address (optional)
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

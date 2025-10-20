export interface ContactData {
  // Name fields
  firstName: string;
  lastName: string;

  // Contact information
  email: string;
  phone: string;

  // Professional information
  organization?: string;
  jobTitle?: string;

  // Additional contact methods
  website?: string;

  // Address (optional)
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

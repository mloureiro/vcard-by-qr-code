import vCard from 'vcards-js';
import type { ContactData } from '../types';

/**
 * Generate VCard string from contact data
 */
export function generateVCard(data: ContactData): string {
  const card = vCard();

  // Name
  card.firstName = data.firstName;
  card.lastName = data.lastName;

  // Contact information
  card.email = data.email;
  card.cellPhone = data.phone;

  // Professional information
  if (data.organization) {
    card.organization = data.organization;
  }
  if (data.jobTitle) {
    card.title = data.jobTitle;
  }
  if (data.website) {
    card.url = data.website;
  }

  // Address
  if (data.address) {
    card.homeAddress.street = data.address.street || '';
    card.homeAddress.city = data.address.city || '';
    card.homeAddress.stateProvince = data.address.state || '';
    card.homeAddress.postalCode = data.address.postalCode || '';
    card.homeAddress.countryRegion = data.address.country || '';
  }

  // Generate VCard string
  return card.getFormattedString();
}

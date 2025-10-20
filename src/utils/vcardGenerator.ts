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

  // Contact information - emails
  if (data.emails.length > 0) {
    card.email = data.emails[0];
    if (data.emails.length > 1) {
      card.workEmail = data.emails[1];
    }
    if (data.emails.length > 2) {
      card.homeEmail = data.emails[2];
    }
  }

  // Contact information - phones
  if (data.phones.length > 0) {
    card.cellPhone = data.phones[0];
    if (data.phones.length > 1) {
      card.workPhone = data.phones[1];
    }
    if (data.phones.length > 2) {
      card.homePhone = data.phones[2];
    }
  }

  // Professional information
  if (data.organization) {
    card.organization = data.organization;
  }
  if (data.jobTitle) {
    card.title = data.jobTitle;
  }
  if (data.websites && data.websites.length > 0) {
    // Set the first website as the primary URL
    card.url = data.websites[0];
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
  let vcardString = card.getFormattedString();

  // Add additional websites manually if there are more than one
  if (data.websites && data.websites.length > 1) {
    // Insert additional URL fields before END:VCARD
    const additionalUrls = data.websites
      .slice(1)
      .map((url) => `URL:${url}`)
      .join('\r\n');
    vcardString = vcardString.replace('END:VCARD', `${additionalUrls}\r\nEND:VCARD`);
  }

  return vcardString;
}

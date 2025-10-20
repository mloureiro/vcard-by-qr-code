import type { ContactData } from '../types';

/**
 * Serialize contact data to URL search params
 */
export function serializeContactData(data: ContactData): URLSearchParams {
  const params = new URLSearchParams();

  // Required fields
  params.set('firstName', data.firstName);
  params.set('lastName', data.lastName);

  // Emails (array)
  data.emails.forEach((email, index) => {
    params.set(`email${index}`, email);
  });

  // Phones (array)
  data.phones.forEach((phone, index) => {
    params.set(`phone${index}`, phone);
  });

  // Optional fields
  if (data.organization) params.set('organization', data.organization);
  if (data.jobTitle) params.set('jobTitle', data.jobTitle);
  if (data.website) params.set('website', data.website);

  // Address fields
  if (data.address) {
    if (data.address.street) params.set('street', data.address.street);
    if (data.address.city) params.set('city', data.address.city);
    if (data.address.state) params.set('state', data.address.state);
    if (data.address.postalCode) params.set('postalCode', data.address.postalCode);
    if (data.address.country) params.set('country', data.address.country);
  }

  return params;
}

/**
 * Deserialize URL search params to contact data
 */
export function deserializeContactData(params: URLSearchParams): ContactData | null {
  const firstName = params.get('firstName');
  const lastName = params.get('lastName');

  // Parse emails array
  const emails: string[] = [];
  let emailIndex = 0;
  while (params.has(`email${emailIndex}`)) {
    const email = params.get(`email${emailIndex}`);
    if (email) emails.push(email);
    emailIndex++;
  }

  // Parse phones array
  const phones: string[] = [];
  let phoneIndex = 0;
  while (params.has(`phone${phoneIndex}`)) {
    const phone = params.get(`phone${phoneIndex}`);
    if (phone) phones.push(phone);
    phoneIndex++;
  }

  // Validate required fields
  if (!firstName || !lastName || emails.length === 0 || phones.length === 0) {
    return null;
  }

  const data: ContactData = {
    firstName,
    lastName,
    emails,
    phones,
  };

  // Optional fields
  const organization = params.get('organization');
  const jobTitle = params.get('jobTitle');
  const website = params.get('website');

  if (organization) data.organization = organization;
  if (jobTitle) data.jobTitle = jobTitle;
  if (website) data.website = website;

  // Address fields
  const street = params.get('street');
  const city = params.get('city');
  const state = params.get('state');
  const postalCode = params.get('postalCode');
  const country = params.get('country');

  if (street || city || state || postalCode || country) {
    data.address = {
      ...(street && { street }),
      ...(city && { city }),
      ...(state && { state }),
      ...(postalCode && { postalCode }),
      ...(country && { country }),
    };
  }

  return data;
}

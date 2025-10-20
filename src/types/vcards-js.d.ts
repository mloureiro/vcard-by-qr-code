declare module 'vcards-js' {
  interface VCard {
    firstName: string;
    lastName: string;
    email: string;
    workEmail: string;
    homeEmail: string;
    cellPhone: string;
    workPhone: string;
    homePhone: string;
    pagerPhone: string;
    organization: string;
    title: string;
    url: string;
    homeAddress: {
      street: string;
      city: string;
      stateProvince: string;
      postalCode: string;
      countryRegion: string;
    };
    workAddress: {
      street: string;
      city: string;
      stateProvince: string;
      postalCode: string;
      countryRegion: string;
    };
    getFormattedString(): string;
  }

  function vCard(): VCard;
  export = vCard;
}

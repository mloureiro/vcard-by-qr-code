# QR Code Links - VCard Generator

A modern web application that generates customizable QR codes for contact sharing. Simply fill in your contact details and receive a beautifully styled QR code that, when scanned, automatically fills contact information on any device.

## Features

- **Contact Form**: Input comprehensive contact details

  - Name
  - Multiple phone numbers
  - Multiple email addresses
  - Organization and job title
  - Website and social media URLs
  - Physical address
  - Profile photo (optional)

- **VCard Generation**: Automatically converts form data to VCard 3.0 format (compatible with iOS, Android, and all major contact apps)

- **Customizable QR Codes**: Generate QR codes with:

  - Custom colors and gradients
  - Logo/image embedding
  - Various dot and corner styles
  - Adjustable size and error correction

- **Download & Share**: Export your QR code as a high-quality image

## Technology Stack

- **Build Tool**: Vite
- **Framework**: React 18 with TypeScript
- **Form Handling**: React Hook Form with Zod validation
- **QR Generation**: qr-code-styling (advanced customization support)
- **VCard Formatting**: vcards-js (RFC 6350 compliant)
- **Styling**: Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:mloureiro/vcard-by-qr-code.git
cd qr-code-links

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Usage

1. Open the application in your browser (typically `http://localhost:5173` in development)
2. Fill in your contact details in the form
3. Add multiple phone numbers or emails using the "+" buttons
4. Optionally upload a profile photo
5. Click "Generate QR Code" to create your personalized QR code
6. Download or share your QR code

## Project Structure

```
src/
├── components/
│   ├── ContactForm.tsx       # Main contact input form
│   ├── QRCodeDisplay.tsx     # QR code rendering and customization
│   └── DownloadButton.tsx    # QR code export functionality
├── utils/
│   └── vcardGenerator.ts     # VCard format generation
├── types/
│   └── contact.ts            # TypeScript type definitions
├── App.tsx                   # Main application component
└── main.tsx                  # Application entry point
```

## How It Works

1. **Client-Side Processing**: All data processing happens in your browser - no server required, ensuring complete privacy
2. **VCard Encoding**: Contact information is formatted according to RFC 6350 (VCard 3.0 standard)
3. **QR Code Generation**: The VCard data is encoded directly into a QR code
4. **Offline Functionality**: Once generated, QR codes work completely offline

## Known Limitations

- QR codes with photos become larger and may be harder to scan from a distance
- Generated QR codes are static - contact information cannot be updated after creation
- No usage analytics or tracking (by design for privacy)
- QR code data capacity is limited to approximately 2KB for optimal scanning

## Privacy

This application prioritizes your privacy:

- All processing happens client-side in your browser
- No data is sent to any server
- No analytics or tracking
- No account creation required

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

[Add your license here]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

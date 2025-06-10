declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: { client_id: string, callback: (response: GoogleCredentialResponse) => void }) => void;
          renderButton: (element: HTMLElement, options: { theme: string, size: string, type: string, shape: string, text: string, logo_alignment: string }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
  clientId?: string;
}

export interface GoogleUser{
  name: string | null
  email: string | null
  picture: string | null
}
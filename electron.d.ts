// Export the electronAPI functions using the exports object
export {};

declare global {
  interface Window {
    electronAPI: {
      queryDatabaseExampleTable: () => Promise<any>;
      // Add other exposed functions here if needed
    };
  }
}

// WATCHPAX 30 Wiki Configuration
const wikiConfig = {
    // Add exact chapter titles to disable them
    // Example: "1. Getting Started"
    disabledChapters: [
    ],
    // Optional: add Supabase credentials for shared badge persistence.
    supabase: {
        url: '',
        anonKey: '',
        table: 'wp30_badge_states'
    }
};

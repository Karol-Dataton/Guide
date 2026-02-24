// WATCHPAX 64 Wiki Configuration
const wikiConfig = {
    // Add exact chapter titles to disable them
    // Example: "1. Getting Started"
    disabledChapters: [
    ],
    // Optional: add Supabase credentials for shared badge persistence.
    supabase: {
        url: 'https://okhfylzirmxqnefdpfdb.supabase.co',
        anonKey: 'sb_publishable_10w8cRkGjJ_id6gkpbMdzA_7XQPABXg',
        table: 'wp64_badge_states'
    }
};

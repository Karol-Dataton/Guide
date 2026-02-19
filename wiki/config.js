// WATCHOUT Wiki Configuration
const wikiConfig = {
    // Add exact chapter titles to disable them
    // Example: "1. Getting Started"
    disabledChapters: [
        "7. Playback",
        "8. The Interface",
        "9. Network Setup",
        "10. External Control",
        "11. Keyboard Shortcuts",
        "12. Troubleshooting"
    ],
    // Optional: add Supabase credentials for shared badge persistence.
    supabase: {
        url: 'https://okhfylzirmxqnefdpfdb.supabase.co',
        anonKey: 'sb_publishable_10w8cRkGjJ_id6gkpbMdzA_7XQPABXg',
        table: 'wiki_badge_states'
    }
};

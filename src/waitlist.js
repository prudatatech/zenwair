import { supabase } from './supabase';

/**
 * Save email to Supabase waitlist table + trigger Edge Function to send welcome email.
 * Returns { success: true } or { success: false, error: string }
 */
export async function joinWaitlist(email, source = 'web') {
    // 1 ── Save to Supabase
    const { error: dbError } = await supabase
        .from('waitlist')
        .insert([{ email, source, created_at: new Date().toISOString() }]);

    if (dbError) {
        // Duplicate email → treat as success for UX
        if (dbError.code === '23505') return { success: true, duplicate: true };
        return { success: false, error: dbError.message };
    }

    // 2 ── Invoke Edge Function to send welcome email via Resend
    try {
        await supabase.functions.invoke('send-welcome', {
            body: { email },
        });
    } catch (err) {
        // Email failure is non-blocking — user is already saved
        console.warn('Edge Function error:', err);
    }

    return { success: true };
}

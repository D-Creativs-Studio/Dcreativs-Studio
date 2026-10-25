export async function sendContactEnquiry(data, fetcher = fetch) {
  const response = await fetcher('/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success !== true) {
    throw new Error(result.error || 'We couldn’t send your enquiry. Please try again or email us directly.');
  }
  return result;
}

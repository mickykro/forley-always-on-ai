/**
 * Hashes a client identifier (phone number) to prevent PII exposure
 * in logs and analytics. Uses a one-way hash that cannot be reversed.
 */
export const hashClientId = async (clientId: string): Promise<string> => {
  // Use a consistent salt for the application
  const salt = "call4li-privacy-v1";
  const data = new TextEncoder().encode(clientId + salt);
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  
  // Convert to base64url-safe string (first 16 chars for brevity)
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.substring(0, 16);
};

/**
 * Synchronous hash for cases where async is not convenient
 * Uses a simple non-cryptographic hash for UI display purposes only
 */
export const hashClientIdSync = (clientId: string): string => {
  let hash = 0;
  const salt = "call4li-privacy-v1";
  const str = clientId + salt;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(16).padStart(8, '0').substring(0, 8);
};

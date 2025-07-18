import { customType } from "drizzle-orm/pg-core"
import { Encryption } from "@/utils/encryption" // Adjust the path as necessary

/**
 * Custom type for encrypted text fields using the Encryption class.
 * Stores all encrypted components in a single field separated by a delimiter.
 */
export const encryptedText = (encryption: Encryption) => {
  return customType<{ data: string | null; notNull: false }>({
    dataType() {
      return "text"
    },
    /**
     * Transforms the value retrieved from the database.
     * @param value - The concatenated encrypted string from the database.
     * @returns The decrypted plain text.
     */
    fromDriver(value: unknown): string | null {
      // Return the encrypted value as is from the database.
      // Decryption should be handled explicitly by the application when needed.
      if (typeof value === "string") {
        return value
      }
      // If value is null or not a string, return it as is (or handle as appropriate)
      return value as string | null
    },
    /**
     * Transforms the value before storing it in the database.
     * @param value - The plain text to encrypt.
     * @returns The concatenated encrypted string.
     */
    toDriver(value: string | null): string | null {
      if (!value) {
        return value
      }
      return encryption.encrypt(value)
    },
  })
}

local claims =
{
  email_verified: false,
} + std.extVar("claims");

{
  "attributes": {
    "email": {
      "source": "claims.email",  // OIDC Claim for the email
      "fallback": null           // Optionally, you can provide a fallback value
    },
    "name": {
      "source": "claims.name",   // OIDC Claim for the name
      "fallback": "Anonymous"
    },
    "sub": {
      "source": "claims.sub",    // Subject identifier from OIDC
      "fallback": null
    }
  }
}

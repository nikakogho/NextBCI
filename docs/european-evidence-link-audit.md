# European evidence source-link audit

Audited on 2026-08-03. This is a transport/reachability check of the unique source URLs introduced by the European evidence dataset; it is not a claim-quality score.

- Unique URLs checked: 304.
- Reachable: 281.
- Access-controlled or rate-limited (401/403/405/429): 20. These are not treated as broken links.
- Network/client failures: 3.
- Hard 404/410 failures: 0.

## Exceptions

| URL | Audit result | Disposition |
|---|---|---|
| https://implex-medical.com/ | network-error | No current operating identity was corroborated. The rendered catalog record is intentionally E0 and warns that the domain and operations are unverified. |
| https://neuro.chat/en/ | network-error | Current official page was independently visible in the web index on 2026-08-03; the Node audit client could not complete its request. |
| https://spinallymedical.com/ | network-error | Current official under-construction page was independently visible in the web index on 2026-08-03; the Node audit client could not complete its request. |

The full machine-readable result, including access-controlled sources, is written to `.research-cache/europe-evidence/link-audit.json` during the audit and is intentionally not versioned.

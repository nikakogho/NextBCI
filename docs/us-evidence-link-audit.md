# U.S. evidence source-link audit

Audited on 2026-08-03. This is a transport/reachability check of the unique source URLs introduced by the U.S. evidence dataset; it is not a claim-quality score.

- Unique URLs checked: 188.
- Reachable: 163.
- Access-controlled or rate-limited (401/403/405/429): 20. These are not treated as broken links.
- Network/client failures: 4.
- Hard 404/410 failures: 0.

## Exceptions

| URL | Audit result | Disposition |
|---|---|---|
| https://cognionics.com/ | network-error | Requires follow-up. |
| https://doi.org/10.1101/2025.10.21.683630 | network-error | Requires follow-up. |
| https://envoymedical.com/ | network-error | Requires follow-up. |
| https://neuralanalytics.com/ | network-error | Requires follow-up. |

The full machine-readable result, including access-controlled sources, is written to `.research-cache/us-evidence/link-audit.json` during the audit and is intentionally not versioned.

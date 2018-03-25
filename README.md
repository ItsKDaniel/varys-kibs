# kibs.parse
parses last **_\_msearch_** response and logs to console. Console's excellent search + filter option makes it useful to analyse the logs, rather than going through the downloaded responses.

**Future Impl**  
export and download the response as txt file in addition to logging in console.

**Bookmarklet code**  
How to implement?  
1. Add varys.js and varys.css to DOM.  
2. Create a xhr hook that adds the xhr response for any url with string \_msearch, to an object in DOM
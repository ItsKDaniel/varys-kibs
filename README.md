# kibs.parse
parses last **_\_msearch_** response and logs to console. Console's excellent search + filter option makes it useful to analyse the logs, rather than going through the downloaded responses.

**Future Impl**  
export and download the response as txt file in addition to logging in console.

**How to use?**  
1. Add code in bookmarklet.min.js as a browser bookmark.  
2. Browse to your kibana instance adn search something.  
3. Click on the bookmark. This will create a button (Parse Logs) under the search button.  
4. Search ***again*** in Kibana.  
5. Click on the parse logs button. If successful, you'd get a snackbar notification.  
6. Check console for your parsed logs.  

**Known Issues**  
- The button can overlap any filters used and make it unusable. **Solution:** Reload the page and use the parser again.

**Bookmarklet code**  
```
javascript:(window.location.pathname.includes('kibana')&&document.msearch_responses===undefined&&document.getElementById('parse_download')===null?(function(open){var import_script=document.createElement('script');import_script.setAttribute('src','https://bbcdn.githack.com/itskdaniel/varys-kibs/raw/df7a463eb95d742cdec89487aa8b061e26e176e1/varys.js');document.head.appendChild(import_script);var import_css=document.createElement('link');import_css.setAttribute('rel','stylesheet');import_css.setAttribute('type','text/css');import_css.setAttribute('href','https://bbcdn.githack.com/itskdaniel/varys-kibs/raw/df7a463eb95d742cdec89487aa8b061e26e176e1/varys.css');document.head.appendChild(import_css);document.msearch_responses='';XMLHttpRequest.prototype.open=function(method,url,async,user,pass){this.addEventListener("readystatechange",function(){if(this.readyState==4&&url.includes("_msearch")){document.msearch_responses=this.response;}},false);open.call(this,method,url,async,user,pass);};})(XMLHttpRequest.prototype.open):document.getElementById('parse_download')===null?kibs_create_button():null);
```
***How is it implemented?***  
1. Add varys.js and varys.css to DOM.  
2. Create a xhr hook that adds the xhr response for any url with string \_msearch, to an object in DOM  
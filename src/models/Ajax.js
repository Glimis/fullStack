import  'fetch-polyfill'

export function Get(url,params){
  return $.ajax({
    url:getUrl(url,params),
    method:'get',
    data:params,
    dataType: 'json',
    contentType: 'application/json',
  })
}

export function Post(url,params){
  return $.ajax({
    url:getUrl(url,params),
    method:'post',
    data:JSON.stringify(params),
    dataType: 'json',
    contentType: 'application/json',
  })
}



function getUrl(url,query){
  if(!query)return url;
  url=url.replace(/:[^/.]*/g,function(val){
    return query[val.slice(1)]||'';
  })
  return url;
}
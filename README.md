# -- WIP NOT YET COMPLETE --

# Promisfied Net Events & `fetch` to obtain server data

This repo is intended to show how one can use the regular `fetch` 
API present in NUI to query server side data. This is a solution using
TypeScript and a promise wrapper around net events. 

*Note: I might make the promise wrapper a seperate library at one point*


### Why?

* **Problem:** In the NUI React repos I help to maintain, we were using    
  convuluted methods of sending & receiving server side data. 
  If we are able to use `fetch` such as it replicates normal developer experience on 
  browser, we can simplify state  management tremendously. 

* **Language Choice**: This example is written in primarily TypeScript and the NUI example 
  is in React (also TypeScript). As `fetch` is simply a a standard browser API, the general 
  principles apply to both vanilla & all JS frameworks. Where it may difffer is in 
  *Reactivity* of fetched data depending on the framework.


### Downsides

There are a couple downsides to use *promisfied* events versus dispatching a request/
response event yourself.

* **Hardcoded Timeout:** As FiveM events fire over UDP the only way to ascertain whether 
  an event has stallled or not is through a hard coded timeout. Considering some users have
  poor network quality, event timeouts may disrupt certain events versus the manual strategy. 

* **Event Names:** As the response event name & registered listener are automatically
  assigned using a UUID, this may disrupt readability of net event logs.

If anybody comes across any other downsides with this strategy in production, create an issue on this repo.

## Client & Server Example

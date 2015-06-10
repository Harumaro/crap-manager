# crap-manager
=
**CRAP (Cookie Required? Ask Permission) Manager** is a cookie banner to comply with italian cookie law.

Set the `crap.options` up then load it with `crap.init()` .

`crap.options`:

* privacy_url: where the 'click here' should point
* click_here: privacy link text
* msg_before: the message before click_here
* msg_after: the message after click_here

Use `crap.shouldBlockCookies()` to check whether the user gave their consent and block yours and third-party cookie based stuff.

Basically this is just to cover your back legally should someone sue you for damn cookies, please mind this is not a fail-safe solution, consult with your lawyer.

# k8s-techofmany

## Tech of Many Things
This project is aiming to provide small creators and teams an alternative way to create a website that will help them to connect with supporters.  There are many options out there today! But none of them really tailor a toolset for easy, cross-platform use.

My goal is to provide creators with audiences on the following platforms:
- Twitch
- Patreon
- Youtube
- Twitter
- Facebook
- Indiegogo
- Discord
- Etsy
- And likely many more!

The ability to connect across all of them and easily cross-post, provide benefits, and manage subscriptions of any kind.

This is an ambitious task!  But streamlining workflows has always been one of my favorite aspects of working in technology, and I think the space could use some love.

## The Sites

Currently this platform consists of two example sites:
- [Main Site](http://techofmany.com/) - where everything is displayed for users to interact with
- [Admin Portal](http://admin.techofmany.com/) - where team members can modify site content

Both of these sites reference the same database and utilize the same user logins.  (Eventually I will provide the ability to lock down the admin site by IP address, optionally).  Access to this admin portal will be something that can be granted to Roles within your users, and different areas of this portal will also have different permissions involved.

## The Library

- [Auth](./@techofmany/auth)
  - Functionality responsible for managing user sessions and login/registration.
- [Blog](./@techofmany/blog)
  - Coming soon!
- [Media](./@techofmany/media)
  - Functionality responsible for managing media libraries & collections.  These include videos/playlists, images/galleries, etc.  A media collection can represent a show, a gallery, a book - whatever you like!
- [Shop](./@techofmany/shop)
  - Coming soon!
- [Storage](./@techofmany/storage)
  - The base data storage library.
- [Users](./@techofmany/users)
  - Functionality responsible for managing users and roles.

### members table
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

* * *

### messages table
|Column|Type|Options|
|------|----|-------|
|body|text|--|
|image|string|--|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

* * *

### users table
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|
|nickname|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :members
- has_many :group, through: :members

* * *

### groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

///



# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

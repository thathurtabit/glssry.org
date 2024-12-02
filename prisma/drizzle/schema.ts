import { relations, sql } from 'drizzle-orm'
import { boolean, foreignKey, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const UserRole = pgEnum('UserRole', ['ADMIN', 'EDITOR', 'CONTRIBUTOR'])

export const TagName = pgEnum('TagName', ['Aeronautics', 'Animals', 'Art', 'Astronomy', 'Aviation', 'Biology', 'Business', 'Chemistry', 'Cinema', 'Civics', 'Communications', 'Computing', 'Construction', 'Crafts', 'Cultural', 'Economics', 'Engineering', 'Entertainment', 'Environment', 'Finance', 'Games', 'Gender', 'Geography', 'Geology', 'Graphic_Novels', 'Hardware', 'Health', 'History', 'Internet', 'Journalism', 'Languages', 'Law', 'Linguistics', 'Literature', 'Mathematics', 'Medicine', 'Military', 'Miscellaneous', 'Music', 'Mythology', 'Networking', 'Oceanography', 'Performance', 'Philosophy', 'Physics', 'Politics', 'Programming', 'Psychology', 'Religion', 'Science', 'Security', 'Slang', 'Sociology', 'Software', 'Space', 'Sports', 'Teaching', 'Technology', 'Television'])

export const Post = pgTable('Post', {
	id: text('id').notNull().primaryKey().default(sql`cuid(1)`),
	createdAt: timestamp('createdAt', { precision: 3 }).notNull().defaultNow(),
	title: text('title').notNull().unique(),
	slug: text('slug').notNull().unique(),
	abbreviation: text('abbreviation').notNull(),
	acronym: text('acronym').notNull(),
	initialism: text('initialism').notNull(),
	authorId: text('authorId').notNull()
}, (Post) => ({
	'Post_author_fkey': foreignKey({
		name: 'Post_author_fkey',
		columns: [Post.authorId],
		foreignColumns: [User.id]
	})
		.onDelete('cascade')
		.onUpdate('cascade')
}));

export const PostVersion = pgTable('PostVersion', {
	id: text('id').notNull().primaryKey().default(sql`cuid(1)`),
	postId: text('postId').notNull(),
	updatedAt: timestamp('updatedAt', { precision: 3 }).notNull().defaultNow(),
	slug: text('slug').notNull(),
	title: text('title').notNull(),
	body: text('body').notNull(),
	abbreviation: text('abbreviation').notNull(),
	acronym: text('acronym').notNull(),
	initialism: text('initialism').notNull(),
	published: boolean('published').notNull(),
	link: text('link').notNull(),
	authorId: text('authorId').notNull(),
	fileUnder: TagName('fileUnder').notNull(),
	tags: jsonb('tags').notNull(),
	relatedPostId1: text('relatedPostId1'),
	relatedPostId2: text('relatedPostId2')
}, (PostVersion) => ({
	'PostVersion_post_fkey': foreignKey({
		name: 'PostVersion_post_fkey',
		columns: [PostVersion.postId],
		foreignColumns: [Post.id]
	})
		.onDelete('cascade')
		.onUpdate('cascade'),
	'PostVersion_author_fkey': foreignKey({
		name: 'PostVersion_author_fkey',
		columns: [PostVersion.authorId],
		foreignColumns: [User.id]
	})
		.onDelete('cascade')
		.onUpdate('cascade')
}));

export const Account = pgTable('Account', {
	id: text('id').notNull().primaryKey().default(sql`cuid(1)`),
	userId: text('userId').notNull(),
	type: text('type').notNull(),
	provider: text('provider').notNull(),
	providerAccountId: text('providerAccountId').notNull(),
	refresh_token: text('refresh_token'),
	access_token: text('access_token'),
	expires_at: integer('expires_at'),
	token_type: text('token_type'),
	scope: text('scope'),
	id_token: text('id_token'),
	session_state: text('session_state')
}, (Account) => ({
	'Account_user_fkey': foreignKey({
		name: 'Account_user_fkey',
		columns: [Account.userId],
		foreignColumns: [User.id]
	})
		.onDelete('cascade')
		.onUpdate('cascade'),
	'Account_provider_providerAccountId_unique_idx': uniqueIndex('Account_provider_providerAccountId_key')
		.on(Account.provider, Account.providerAccountId)
}));

export const Session = pgTable('Session', {
	id: text('id').notNull().primaryKey().default(sql`cuid(1)`),
	sessionToken: text('sessionToken').notNull().unique(),
	userId: text('userId').notNull(),
	expires: timestamp('expires', { precision: 3 }).notNull()
}, (Session) => ({
	'Session_user_fkey': foreignKey({
		name: 'Session_user_fkey',
		columns: [Session.userId],
		foreignColumns: [User.id]
	})
		.onDelete('cascade')
		.onUpdate('cascade')
}));

export const User = pgTable('User', {
	id: text('id').notNull().primaryKey().default(sql`cuid(1)`),
	name: text('name'),
	username: text('username').unique(),
	hasPersonalizedUsername: boolean('hasPersonalizedUsername').notNull(),
	email: text('email').unique(),
	emailVerified: timestamp('emailVerified', { precision: 3 }),
	image: text('image'),
	role: UserRole('role').notNull().default("CONTRIBUTOR")
});

export const VerificationToken = pgTable('VerificationToken', {
	identifier: text('identifier').notNull(),
	token: text('token').notNull().unique(),
	expires: timestamp('expires', { precision: 3 }).notNull()
}, (VerificationToken) => ({
	'VerificationToken_identifier_token_unique_idx': uniqueIndex('VerificationToken_identifier_token_key')
		.on(VerificationToken.identifier, VerificationToken.token)
}));

export const PostRelations = relations(Post, ({ one, many }) => ({
	author: one(User, {
		relationName: 'PostToUser',
		fields: [Post.authorId],
		references: [User.id]
	}),
	versions: many(PostVersion, {
		relationName: 'PostToPostVersion'
	})
}));

export const PostVersionRelations = relations(PostVersion, ({ one }) => ({
	post: one(Post, {
		relationName: 'PostToPostVersion',
		fields: [PostVersion.postId],
		references: [Post.id]
	}),
	author: one(User, {
		relationName: 'PostVersionToUser',
		fields: [PostVersion.authorId],
		references: [User.id]
	})
}));

export const AccountRelations = relations(Account, ({ one }) => ({
	user: one(User, {
		relationName: 'AccountToUser',
		fields: [Account.userId],
		references: [User.id]
	})
}));

export const SessionRelations = relations(Session, ({ one }) => ({
	user: one(User, {
		relationName: 'SessionToUser',
		fields: [Session.userId],
		references: [User.id]
	})
}));

export const UserRelations = relations(User, ({ many }) => ({
	accounts: many(Account, {
		relationName: 'AccountToUser'
	}),
	sessions: many(Session, {
		relationName: 'SessionToUser'
	}),
	posts: many(Post, {
		relationName: 'PostToUser'
	}),
	PostVersion: many(PostVersion, {
		relationName: 'PostVersionToUser'
	})
}));
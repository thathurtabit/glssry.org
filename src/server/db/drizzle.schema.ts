/* eslint-disable new-cap */
/* eslint-disable camelcase */

import { relations, sql } from "drizzle-orm";
import {
	index,
	integer,
	pgTableCreator,
	primaryKey,
	text,
	timestamp,
	varchar,
	boolean,
	jsonb,
	pgEnum,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const UserRole = pgEnum("UserRole", ["ADMIN", "EDITOR", "CONTRIBUTOR"]);

export const TagName = pgEnum("TagName", ["Aeronautics", "Animals", "Art", "Astronomy", "Aviation", "Biology", "Business", "Chemistry", "Cinema", "Civics", "Communications", "Computing", "Construction", "Crafts", "Cultural", "Economics", "Engineering", "Entertainment", "Environment", "Finance", "Games", "Gender", "Geography", "Geology", "Graphic_Novels", "Hardware", "Health", "History", "Internet", "Journalism", "Languages", "Law", "Linguistics", "Literature", "Mathematics", "Medicine", "Military", "Miscellaneous", "Music", "Mythology", "Networking", "Oceanography", "Performance", "Philosophy", "Physics", "Politics", "Programming", "Psychology", "Religion", "Science", "Security", "Slang", "Sociology", "Software", "Space", "Sports", "Teaching", "Technology", "Television"]);

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => name);

export const posts = createTable(
	"post",
	{
		id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
		name: varchar("name", { length: 256 }),
		createdById: varchar("created_by", { length: 255 })
			.notNull()
			.references(() => users.id),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
			() => new Date()
		),
		title: text("title").notNull().unique(),
		slug: text("slug").notNull().unique(),
		abbreviation: text("abbreviation").notNull(),
		acronym: text("acronym").notNull(),
		initialism: text("initialism").notNull(),
		authorId: text("authorId").notNull(),
	},
	(example) => ({
		createdByIdIdx: index("created_by_idx").on(example.createdById),
		nameIndex: index("name_idx").on(example.name),
	})
);

export const postVersions = createTable(
	"postVersion",
	{
		id: text("id").notNull().primaryKey().default(sql`cuid(1)`),
		postId: text("postId").notNull(),
		updatedAt: timestamp("updatedAt", { precision: 3 }).notNull().defaultNow(),
		slug: text("slug").notNull(),
		title: text("title").notNull(),
		body: text("body").notNull(),
		abbreviation: text("abbreviation").notNull(),
		acronym: text("acronym").notNull(),
		initialism: text("initialism").notNull(),
		published: boolean("published").notNull(),
		link: text("link").notNull(),
		authorId: text("authorId").notNull(),
		fileUnder: TagName("fileUnder").notNull(),
		tags: jsonb("tags").notNull(),
		relatedPostId1: text("relatedPostId1"),
		relatedPostId2: text("relatedPostId2"),
	}
);

export const postVersionsRelations = relations(postVersions, ({ one }) => ({
	post: one(posts, {
		fields: [postVersions.postId],
		references: [posts.id],
	}),
}));

export const users = createTable("user", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("email_verified", {
		mode: "date",
		withTimezone: true,
	}).default(sql`CURRENT_TIMESTAMP`),
	image: varchar("image", { length: 255 }),
	username: text("username").unique(),
	hasPersonalizedUsername: boolean("hasPersonalizedUsername").notNull(),
	role: UserRole("role").notNull().default("CONTRIBUTOR"),
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));

export const accounts = createTable(
	"account",
	{
		userId: varchar("user_id", { length: 255 })
			.notNull()
			.references(() => users.id),
		type: varchar("type", { length: 255 })
			.$type<AdapterAccount["type"]>()
			.notNull(),
		provider: varchar("provider", { length: 255 }).notNull(),
		providerAccountId: varchar("provider_account_id", {
			length: 255,
		}).notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: varchar("token_type", { length: 255 }),
		scope: varchar("scope", { length: 255 }),
		id_token: text("id_token"),
		session_state: varchar("session_state", { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
		userIdIdx: index("account_user_id_idx").on(account.userId),
	})
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
	"session",
	{
		sessionToken: varchar("session_token", { length: 255 })
			.notNull()
			.primaryKey(),
		userId: varchar("user_id", { length: 255 })
			.notNull()
			.references(() => users.id),
		expires: timestamp("expires", {
			mode: "date",
			withTimezone: true,
		}).notNull(),
	},
	(session) => ({
		userIdIdx: index("session_user_id_idx").on(session.userId),
	})
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
	"verification_token",
	{
		identifier: varchar("identifier", { length: 255 }).notNull(),
		token: varchar("token", { length: 255 }).notNull(),
		expires: timestamp("expires", {
			mode: "date",
			withTimezone: true,
		}).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	})
);

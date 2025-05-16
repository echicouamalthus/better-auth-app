import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todo = sqliteTable('todos', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	content: text('content').notNull(),
	completed: integer('completed', { mode: 'boolean' }).default(false),
});

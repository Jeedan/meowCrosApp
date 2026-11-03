CREATE TABLE `feeding_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`loggedAt` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `foods` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`brand` text NOT NULL,
	`foodType` text NOT NULL,
	`proteinPCT` real NOT NULL,
	`fatPCT` real NOT NULL,
	`fiberPCT` real NOT NULL,
	`moisturePCT` real NOT NULL,
	`ashPCT` real,
	`servingSizeG` real NOT NULL,
	`lastUsedAt` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	CONSTRAINT "food_type_check" CHECK("foods"."foodType" IN ('wet', 'dry'))
);
--> statement-breakpoint
CREATE TABLE `plate_items` (
	`id` text PRIMARY KEY NOT NULL,
	`feedingLogId` text NOT NULL,
	`foodId` text NOT NULL,
	`foodType` text NOT NULL,
	`foodNameSnapshot` text NOT NULL,
	`proteinPCT` real NOT NULL,
	`fatPCT` real NOT NULL,
	`fiberPCT` real NOT NULL,
	`moisturePCT` real NOT NULL,
	`ashPCT` real,
	`gramsServed` real NOT NULL,
	`kcalCalculated` real NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`feedingLogId`) REFERENCES `feeding_logs`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "food_type_check" CHECK("plate_items"."foodType" IN ('wet', 'dry'))
);
--> statement-breakpoint
CREATE INDEX `idx_plate_items_feedinglogsId` ON `plate_items` (`feedingLogId`);
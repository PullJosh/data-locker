-- CreateTable
CREATE TABLE "JSONDocument" (
    "id" UUID NOT NULL,
    "json" JSONB NOT NULL,
    "password" TEXT,

    CONSTRAINT "JSONDocument_pkey" PRIMARY KEY ("id")
);

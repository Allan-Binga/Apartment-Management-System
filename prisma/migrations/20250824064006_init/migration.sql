-- CreateTable
CREATE TABLE "public"."tenants" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstname" VARCHAR(100),
    "lastname" VARCHAR(100),
    "email" VARCHAR(100) NOT NULL,
    "phonenumber" VARCHAR(20),
    "apartmentnumber" VARCHAR(20),
    "leasestartdate" DATE,
    "leaseenddate" DATE,
    "password" TEXT NOT NULL,
    "isverified" BOOLEAN NOT NULL DEFAULT false,
    "verificationtoken" VARCHAR(255),
    "verificationtokenexpiry" TIMESTAMP(0),
    "passwordresettoken" TEXT,
    "passwordresettokenexpiry" TIMESTAMP(0),

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."apartment_listings" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "square_feet" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,
    "updated_at" TIMESTAMP(3),
    "apartmentnumber" VARCHAR(10) NOT NULL,
    "beds" VARCHAR(50),
    "baths" INTEGER,
    "leasingstatus" TEXT,

    CONSTRAINT "apartment_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reports" (
    "id" SERIAL NOT NULL,
    "report_type" VARCHAR(50) NOT NULL,
    "tenant_name" VARCHAR(255) NOT NULL,
    "apartment_id" VARCHAR(50) NOT NULL,
    "amount_paid" DECIMAL(10,2),
    "payment_date" DATE,
    "payment_status" VARCHAR(50),
    "issue_title" VARCHAR(255),
    "issue_description" TEXT,
    "maintenance_status" VARCHAR(50),
    "email" VARCHAR(255),
    "phone_number" VARCHAR(20),
    "registration_date" DATE,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."receipts" (
    "id" SERIAL NOT NULL,
    "tenant_id" UUID,
    "apartment_number" VARCHAR(20),
    "payment_date" DATE,
    "amount_paid" INTEGER,
    "pdf" BYTEA,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment" (
    "paymentid" SERIAL NOT NULL,
    "tenantid" UUID,
    "amountpaid" DECIMAL(10,2) NOT NULL,
    "paymentdate" DATE NOT NULL,
    "paymentmethod" VARCHAR(50) NOT NULL,
    "paymentstatus" VARCHAR(20) DEFAULT 'Pending',

    CONSTRAINT "payment_pkey" PRIMARY KEY ("paymentid")
);

-- CreateTable
CREATE TABLE "public"."landlords" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phonenumber" VARCHAR(15) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "landlords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "notification_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID,
    "message" TEXT NOT NULL,
    "notification_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(10) DEFAULT 'unread',

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "public"."maintenance_requests" (
    "request_id" SERIAL NOT NULL,
    "tenant_id" UUID,
    "issue_description" TEXT NOT NULL,
    "request_date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "status" VARCHAR(50) NOT NULL,
    "technician_id" INTEGER,
    "category" VARCHAR(100) DEFAULT 'General',

    CONSTRAINT "maintenance_requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "public"."admins" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."technicians" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20),
    "specialty" VARCHAR(50),

    CONSTRAINT "technicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ratings" (
    "id" SERIAL NOT NULL,
    "listing_id" INTEGER,
    "tenant_id" UUID,
    "rating" INTEGER,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_email_key" ON "public"."tenants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "apartment_listings_apartmentnumber_key" ON "public"."apartment_listings"("apartmentnumber");

-- CreateIndex
CREATE UNIQUE INDEX "landlords_email_key" ON "public"."landlords"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "public"."admins"("email");

-- AddForeignKey
ALTER TABLE "public"."receipts" ADD CONSTRAINT "receipts_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_tenantid_fkey" FOREIGN KEY ("tenantid") REFERENCES "public"."tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."maintenance_requests" ADD CONSTRAINT "maintenance_requests_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."maintenance_requests" ADD CONSTRAINT "maintenance_requests_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "public"."technicians"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ratings" ADD CONSTRAINT "ratings_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "public"."apartment_listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ratings" ADD CONSTRAINT "ratings_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

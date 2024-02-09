/*
  Warnings:

  - Added the required column `participation_id` to the `executions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "executions" ADD COLUMN     "participation_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "executions" ADD CONSTRAINT "executions_participation_id_fkey" FOREIGN KEY ("participation_id") REFERENCES "participations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

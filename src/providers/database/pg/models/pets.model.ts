import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
} from 'sequelize-typescript';
import * as moment from 'moment-timezone';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Table({
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'pets',
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class Pet extends Model<Pet> {
    @Field(() => Int)
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    id?: bigint;

    @Field(() => String)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Field(() => String, { nullable: true })
    @Column({
        type: DataType.DATE,
        get() {
            if (this.getDataValue('created_at'))
                return moment(this.getDataValue('created_at'))
                    .tz('Asia/Jakarta')
                    .format();
            return null;
        },
        set(value) {
            if (value)
                this.setDataValue(
                    'created_at',
                    moment.tz(value, 'Asia/Jakarta').toISOString(),
                );
        },
    })
    created_at?: string;

    @Field(() => String, { nullable: true })
    @Column({
        type: DataType.DATE,
        get() {
            if (this.getDataValue('updated_at'))
                return moment(this.getDataValue('updated_at'))
                    .tz('Asia/Jakarta')
                    .format();
            return null;
        },
        set(value) {
            if (value)
                this.setDataValue(
                    'updated_at',
                    moment.tz(value, 'Asia/Jakarta').toISOString(),
                );
        },
    })
    updated_at?: string;

    @Field(() => String, { nullable: true })
    @Column({
        type: DataType.DATE,
        get() {
            if (this.getDataValue('deleted_at'))
                return moment(this.getDataValue('deleted_at'))
                    .tz('Asia/Jakarta')
                    .format();
            return null;
        },
        set(value) {
            if (value)
                this.setDataValue(
                    'deleted_at',
                    moment.tz(value, 'Asia/Jakarta').toISOString(),
                );
        },
    })
    deleted_at?: string;
}

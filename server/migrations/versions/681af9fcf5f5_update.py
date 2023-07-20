"""update

Revision ID: 681af9fcf5f5
Revises: d4c8c919026f
Create Date: 2023-07-19 14:35:18.677958

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '681af9fcf5f5'
down_revision = 'd4c8c919026f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('compounds')
    op.drop_table('workout_sessions')
    op.drop_table('training_programs')
    op.drop_table('accessories')
    op.drop_table('accessory_trainings')
    op.drop_table('compound_trainings')
    with op.batch_alter_table('max_lifts', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATETIME(),
               type_=sa.String(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('max_lifts', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.String(),
               type_=sa.DATETIME(),
               existing_nullable=False)

    op.create_table('compound_trainings',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('sets', sa.INTEGER(), nullable=False),
    sa.Column('reps', sa.INTEGER(), nullable=False),
    sa.Column('weight', sa.INTEGER(), nullable=False),
    sa.Column('compound_lift_id', sa.INTEGER(), nullable=False),
    sa.Column('training_program_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['compound_lift_id'], ['compounds.id'], name='fk_compound_trainings_compound_lift_id_compounds'),
    sa.ForeignKeyConstraint(['training_program_id'], ['training_programs.id'], name='fk_compound_trainings_training_program_id_training_programs'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('accessory_trainings',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('sets', sa.INTEGER(), nullable=False),
    sa.Column('reps', sa.INTEGER(), nullable=False),
    sa.Column('weight', sa.INTEGER(), nullable=False),
    sa.Column('accessory_id', sa.INTEGER(), nullable=False),
    sa.Column('training_program_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['accessory_id'], ['accessories.id'], name='fk_accessory_trainings_accessory_id_accessories'),
    sa.ForeignKeyConstraint(['training_program_id'], ['training_programs.id'], name='fk_accessory_trainings_training_program_id_training_programs'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('accessories',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('training_programs',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=False),
    sa.Column('duration', sa.INTEGER(), nullable=False),
    sa.Column('frequency', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_training_programs_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workout_sessions',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('date', sa.VARCHAR(), nullable=False),
    sa.Column('notes', sa.VARCHAR(length=250), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('training_program_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['training_program_id'], ['training_programs.id'], name='fk_workout_sessions_training_program_id_training_programs'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_workout_sessions_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('compounds',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###

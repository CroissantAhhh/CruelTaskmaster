"""empty message

Revision ID: 9c4933340d31
Revises: 383d01fc2776
Create Date: 2021-11-19 11:39:27.033455

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9c4933340d31'
down_revision = '383d01fc2776'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sections',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('job_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('task_order', sa.String(length=1000), nullable=False),
    sa.ForeignKeyConstraint(['job_id'], ['jobs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('tasks', sa.Column('section_id', sa.Integer(), nullable=False))
    op.drop_constraint('tasks_job_id_fkey', 'tasks', type_='foreignkey')
    op.create_foreign_key(None, 'tasks', 'sections', ['section_id'], ['id'])
    op.drop_column('tasks', 'job_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('job_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'tasks', type_='foreignkey')
    op.create_foreign_key('tasks_job_id_fkey', 'tasks', 'jobs', ['job_id'], ['id'])
    op.drop_column('tasks', 'section_id')
    op.drop_table('sections')
    # ### end Alembic commands ###

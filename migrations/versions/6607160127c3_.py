"""empty message

Revision ID: 6607160127c3
Revises: 5fc0a1284349_
Create Date: 2021-06-06 16:22:49.216579

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6607160127c3'
down_revision = '5fc0a1284349'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pathstone',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('convo_snip_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['convo_snip_id'], ['conversation_snippet.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pathstone')
    # ### end Alembic commands ###